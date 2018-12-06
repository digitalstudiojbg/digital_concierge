import React from 'react'
import { ContainerDiv, CreateContentContainerDiv } from '../../../utils/Constants';
import SingleImageUploader from '../../../utils/SingleImageUploader';

export const CreateCategory = (props) => (
    <ContainerDiv>
        <div style={{display: "flex", alignItems: "center", marginBottom: 40}}>
            <div style={{color: "rgb(35,38,92)", fontSize: "2.5vw", width: "90%"}}>ADD CATEGORY</div>
            <div style={{color: "rgb(35,38,92)", fontSize: "1vw", width: "10%"}}>ADD {'&'} SAVE</div>
        </div>
        <CreateContentContainerDiv>
            <div style={{width: "50%"}}>
                <div style={{padding: 20}}>HEADER IMAGE:</div>
                <SingleImageUploader />
            </div>
            <div style={{width: "50%"}}>
            <div style={{padding: 20}}>CATEGORY TITLE:</div>
            </div>
        </CreateContentContainerDiv>
    </ContainerDiv>
)

export default CreateCategory