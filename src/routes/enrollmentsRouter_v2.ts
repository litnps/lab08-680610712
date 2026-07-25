import { Router, type Request, type Response } from "express";

//import db
import { students, courses, enrollments } from '../db/db.js';
import { type Enrollment } from "../libs/types.js";
import {
    zEnrollmentBody
} from "../libs/zodValidators.js";

const router = Router();



router.delete("/", (req: Request, res: Response) => {
  try {
    const body = req.body as Enrollment;
    const result = zEnrollmentBody.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues[0]?.message,
        });
    }

    const eIndex = enrollments.findIndex((e) => e.courseId === body.courseId && e.studentId === body.studentId);
    const enrollment = enrollments[eIndex];
    if(!enrollment){
        return res.status(404).json({
            ok: false,
            message: "Enrollment does not exist"
        })
    }

    // delete in student
    const sIndex = students.findIndex((s) => enrollment.studentId === s.studentId);
    const cIndex = students[sIndex]?.courses?.findIndex((c) => enrollment.courseId === c);

    if(!cIndex) {
        return res.status(404).json({
            ok: false,
            message: `${enrollment.courseId} in ${enrollment.studentId} is not exist`
        })
    }

    students[sIndex]?.courses?.splice(cIndex, 1);
    
    // delete in enrollment
    enrollments.splice(eIndex, 1);
    
    
    return res.status(200).json({
        ok: true,
        message: "Enrollment has been deleted"
    })
   
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;