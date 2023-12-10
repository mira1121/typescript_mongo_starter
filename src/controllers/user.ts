import User from "../models/user.model";
import { Request, Response } from "express";
import { textract, rekognition } from "../utils/aws.util";

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const firstName = await analyse(req.body.unemlehPic, "firstName");
        const lastName = await analyse(req.body.unemlehPic, "lastName");
        const regNo = await analyse(req.body.unemlehPic, "regNo");
        const body = {
            lastName: lastName,
            firstName: firstName,
            regNo: req.body.regNo,
            unemlehPic: req.body.unemlehPic,
            selfiePic: req.body.selfiePic,
            isRegisterVerified: regNo == req.body.regNo ? true : false,
            isCardVerified: regNo == req.body.regNo ? true : false,
            isUserVerified: await reko(req.body.unemlehPic, req.body.selfiePic),
        };
        const newUser = await User.create(body);
        res.send(newUser);
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const analyse = async (data: string, name: string): Promise<string> => {
    const params = {
        Document: {
            S3Object: {
                Bucket: process.env.AWS_BUCKET,
                Name: data,
            },
        },
        FeatureTypes: ["FORMS"],
    };
    const cardData = await textract.analyzeDocument(params).promise();
    return cardData.Blocks ? cardData.Blocks[0].Text : "";
};

const reko = async (image1: string, image2: string): Promise<boolean> => {
    const params = {
        SourceImage: {
            S3Object: {
                Bucket: process.env.AWS_BUCKET,
                Name: image1,
            },
        },
        TargetImage: {
            S3Object: {
                Bucket: process.env.AWS_BUCKET,
                Name: image2,
            },
        },
        SimilarityThreshold: 70,
    };
    let isValid = true;
    const result = await rekognition.compareFaces(params).promise();
    result.FaceMatches.forEach((data) => {
        if (data.Similarity < 70) {
            isValid = false;
        }
    });
    return isValid;
};
