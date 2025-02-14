import statuses from "statuses";  // ✅ Fixed import
const message = statuses.message;
import { isItAdmin, isItCustomer } from "./userController.js";
import inquiry from "../moduless/inquiry.js";


export async function addInquiry(req, res) {
    try {
        if (isItCustomer(req)) {
            const data = req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            let id = 0;

            const inquiries = await inquiry.find().sort({ id: -1 }).limit(1);

            if (inquiries.length == 0) {
                id = 1;
            } else {
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newinquiry = new inquiry(data);
            const response = await newinquiry.save();

            res.json({
                message: "inquiry added successfully",
                id: response.id
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "Failed to add inquiry"
        });
    }
}
export async function getInquiries(req,res) {
    try{

        if(isItCustomer(req)){
            const inquiries = await inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
           const inquiries = await inquiry.find();
          res.json(inquiries);
          return;
        }else{
            res.status(403).json({
                message : "You are not authorized to perform this action"
            })
            return;
        }
    }catch(e){
        res.status(500).json({
            message : "Failed to get inquiries"
        })
    }
}
export async function deleteInquiry(req, res) {
    try {
        if (isItAdmin(req)) {
            const id = req.params.id;  // ✅ Fixed spelling

            await inquiry.deleteOne({ id: id });
            res.json({
                message: "Inquiry deleted successfully"
            });
            return;
        } else if (isItCustomer(req)) {
            const id = req.params.id;  // ✅ Fixed spelling
            const foundInquiry = await inquiry.findOne({ id: id });  // ✅ Renamed variable to avoid conflict

            if (foundInquiry == null) {
                res.status(404).json({
                    message: "Inquiry not found"
                });
                return;
            } else {
                if (foundInquiry.email == req.user.email) {  // ✅ Fixed req.user.email spelling
                    await inquiry.deleteOne({ id: id });
                    res.json({
                        message: "Inquiry deleted successfully"
                    });
                    return;
                } else {
                    res.status(403).json({
                        message: "You are not authorized to perform this action"
                    });
                    return;
                }
            }
        } else {
            res.status(403).json({
                message: "You are not authorized to perform this action"
            });
            return;
        }
    } catch (e) {
        res.status(500).json({
            message: "Failed to delete inquiry",
            error: e.message,  // ✅ Added to debug error messages
        });
    }
}

export async function updateInquiry(req,res) {
    try{
       if(isItAdmin(req)){
          const id = req.params.id;
          const data = req.body;

          await inquiry.updateOne({id:id},data)
         res.json({
            message : "Inquiry updated sucessfully"
         })
       }else if(isItCustomer(req)){
        const id = req.params.id;
        const data = req.body;

        const inquiry = await inquiry.findOne({id:id});
        if(inquiry == null){
            res.status(404).json({
                message : "Inquiry not found"
            })
            return;
        }else{
            if(inquiry.email == req.user.email){

                await Inquiry.updateOne({_id:id},{message : data.message})
                res.json({
                    message : "Inquiry updated successfully"
                })
                return;
            }else{
                res.status(403).json({
                    message : "You are not authorized to perform this action"
                })
                return
            }
        }

       }else{
         res.status(403).json({
            message : "You are not authorized to perform this action"
         })

       }




    }catch(e){
            res.status(500).json({
                message :"failed to update inquiry"
            })
    }
}
