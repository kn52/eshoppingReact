import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import {Box} from "@material-ui/core";

export default class HomepagePlaceHolder extends React.Component {
    render() {
        return (
            <Skeleton style={{borderRadius: "6px",Width: "100%", height: "fit-content",visibility:'visible'}} variant={"rect"}
                      animation={"wave"}>
                <Skeleton style={{maxWidth: "100%", height: "50%",visibility:"visible"}} variant={"rect"} animation={"wave"}>
                    <Box style={{margin: "10px auto", width: "60%", height: "135px"}}>
                        <Skeleton style={{margin: "10px auto", width: "60%", height: "135px",visibility:'visible'}} variant={"rect"}
                                  animation={"wave"}/>
                    </Box>
                </Skeleton>
                <Box height={130} style={{Width: "100%",visibility:'visible'}}>
                    <Box style={{marginTop:"20px",display:"flex",justifyContent: "space-between", margin: "auto", width: "100%", height: "30px"}}>
                        <Skeleton style={{marginLeft: "10px",marginTop: "3px",visibility:'visible'}} height={30} width={120} variant={"text"}
                                  animation={"wave"}/>
                        <Skeleton style={{margin: "8px 20px auto auto",visibility:'visible !important'}} height={30} width={30} variant={"circle"}
                                  animation={"wave"}/>
                    </Box>
                    <Skeleton style={{marginLeft: "10px",visibility:'visible'}} height={30} width={100} variant={"text"} animation={"wave"}/>
                    <Skeleton style={{marginLeft: "10px",visibility:'visible'}} height={30} width={80} variant={"text"} animation={"wave"}/>
                    <Skeleton style={{margin: "2px auto",borderRadius:"6px",visibility:'visible'}} height={40} width={130} variant={"text"} animation={"wave"}/>
                </Box>
            </Skeleton>
        )
    };
}
