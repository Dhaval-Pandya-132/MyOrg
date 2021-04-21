import React, { Component } from "react";
import OrgChartComponent from "./OrgChart";
import * as d3 from "d3";
import Cookies from "js-cookie";
import orgServices from '../../services/org.service'
import userService from '../../services/users.service'
import { getOrgDetails } from '../../actions/organizationActions'
import { getAllUsers } from '../../actions/usersActions'
import { connect } from 'react-redux';
import sample from './sample.json'
import utils from './../../utils/utils'

class OrgChartTree extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            usersList: [],
            orgDetails: {}
        };
    }

    render() {
        console.log("this.state.orgDetails.email-->", this.state.orgDetails.email);
        const nodeList = this.state.usersList.map((user, index) => {
            return {
                "nodeId": `0-${index + 1}`,
                "email": user.email
            }
        })
        let rootNodeId;
        nodeList.forEach(node => {
            if (node.email.toUpperCase() === this.state.orgDetails.email.toUpperCase()) {
                rootNodeId = node.nodeId;
            }
        })
        console.log("rootNodeId", rootNodeId);

        const flist = this.state.usersList.map(obj => {
            // console.log("obj", obj)
            let parentNodeId;
            let childNodeId;
            nodeList.forEach(u => {
                if (u.email.toUpperCase() === obj.email.toUpperCase()) {
                    childNodeId = u.nodeId;
                } else if (obj.managerDetail === undefined || obj.managerDetail.email === undefined) {
                    parentNodeId = rootNodeId;
                } else if (obj.managerDetail.email.toUpperCase() === u.email.toUpperCase()) {
                    parentNodeId = u.nodeId;
                }
            })
            // return obj
            if (obj.email.toUpperCase() === this.state.orgDetails.email.toUpperCase()) {
                return {
                    ...sample
                    , nodeId: childNodeId
                    , template: utils.getTemplate(obj.userName, obj.role === undefined ? "N/A" : obj.role)
                    , nodeImage: {
                        ...sample.nodeImage,
                        url: obj.picture
                    }
                }
            } else {
                return {
                    ...sample
                    , nodeId: childNodeId
                    , parentNodeId: parentNodeId
                    , template: utils.getTemplate(obj.userName, obj.role === undefined ? "N/A" : obj.role)
                    , nodeImage: {
                        ...sample.nodeImage,
                        url: obj.picture
                    }
                    , backgroundColor: {
                        ...sample.backgroundColor,
                        "red": 51,
                        "green": 182,
                        "blue": 208,
                        "alpha": 1

                    }
                }
            }
        });


        console.log("flist", flist)

        return <OrgChartComponent data={flist} />;
    }


    updateOrgDetails = async (tokenId, orgID) => {
        const response = await orgServices
            .getOrgDetails(tokenId, orgID);
        this.setState({ orgDetails: response });
        this.props.getOrgDetails(response);
    }

    getUsers = async (tokenId, googleId) => {

        const response = await userService.getUsersByGoogleId(tokenId, { googleId });
        console.log("response", response);
        this.setState({ usersList: response });
        this.props.getAllUsers(response)

    }


    componentDidMount() {
        const tokenId = Cookies.get('tokenId')
        const orgId = Cookies.get('orgId')
        const googleId = Cookies.get('googleId')
        this.updateOrgDetails(tokenId, orgId);
        this.getUsers(tokenId, googleId);
        console.log(this.state);
        d3.json(
            "https://gist.githubusercontent.com/bumbeishvili/dc0d47bc95ef359fdc75b63cd65edaf2/raw/c33a3a1ef4ba927e3e92b81600c8c6ada345c64b/orgChart.json"
        ).then(data => {
            console.log(data[0]);
            this.setState({ data: data });
        });
    }
}

const mapStateToProps = (state) => ({
    usersList: state.globalStateReducer.usersList,
    orgDetail: state.globalStateReducer.orgDetail
});

const mapDispatchToProps = (dispatch) => ({
    getOrgDetails: (orgDetails) => getOrgDetails(dispatch, orgDetails),
    getAllUsers: (userList) => getAllUsers(dispatch, userList)
})

export default connect(mapStateToProps, mapDispatchToProps)(OrgChartTree);
