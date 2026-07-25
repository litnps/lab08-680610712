import { Router, type Request, type Response } from "express";

//import db
import { students, courses, enrollments } from '../db/db.js';
import { type Student, type Course } from "../libs/types.js";
// import {
//     zEnrollmentBody
// } from "../libs/zodValidators.js";

const router = Router();



router.get("/", (req: Request, res: Response) => {
  try {
    const courseId = req.query.courseId;
    const studentId = req.query.studentId;

    if((courseId && studentId) || (!courseId && !studentId)) {
        return res.status(400).json({
            ok: false,
            message: "Please provide either studentId or courseNo and not both!",
        })
    }
    else if(courseId){
        let resData = enrollments
                        .filter((e) => e.courseId === courseId)
                        .map((e) => students.filter((x) => x.studentId === e.studentId)[0])
                        .map((s) => ({
                            studentId: s?.studentId,
                            firstName: s?.firstName,
                            lastName: s?.lastName,
                            program: s?.program,
                        }));

        return res.status(200).json({
            ok: true,
            students: resData,
        })
    }   
    else if(studentId){
        let resData = enrollments.filter((e) => e.studentId === studentId).map((e) => courses.filter((c) => c.courseId === e.courseId)[0])
            .map((c) => ({
                courseId: c?.courseId,
                title: c?.courseTitle,
            }));

        return res.status(200).json({
            ok: true,
            courses: resData
        })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something is wrong, please try again",
      error: err,
    });
  }
});

export default router;