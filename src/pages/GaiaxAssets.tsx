import {useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import asset from '../assets/json/1_asset_routing_request.json';
import policy from '../assets/json/2_policy_definition.json';
import contractDefinition from '../assets/json/3_routing_request_contract_definition.json';
import JsonView from "@uiw/react-json-view";
import GaiaxRoutingImage from "../components/GaiaxRoutingImage.tsx";

function GaiaxAssets() {
    const [currentTab, setTab] = useState(0);

    const checkIcon = <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 mr-2"/>
    const stateLine = "sm:after:content-[''] md:w-full after:w-full after:h-1 after:border-b after:border-gaiaPurple after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-6 ";
    const tabDefault = "flex items-center cursor-default ";
    const tabActive = tabDefault + " text-tuGreen";
    const tabInactive = tabDefault + " text-gaiaPurple";
    const cardStyle = "inline-block p-6 bg-green-50 border border-gaiaPurple rounded-lg shadow";

    return (
        <div className="content-center justify-center">
            <GaiaxRoutingImage/>

            <ol className="flex items-center w-full text-sm font-medium text-center mb-4">
                <li className={(currentTab == 0 ? stateLine + tabActive : stateLine + tabInactive)}>
                    <span
                        onClick={() => (setTab(0))}
                        className="flex items-center">
                        {currentTab > 0 ? checkIcon : <span className="me-2">1</span>}
                        Routing Request Asset
                    </span>
                </li>
                <li className={(currentTab == 1 ? stateLine + tabActive : stateLine + tabInactive)}>
                    <span
                        onClick={() => (setTab(1))}
                        className="flex items-center">
                        {currentTab > 1 ? checkIcon : <span className="me-2">2</span>}
                        Policy
                    </span>
                </li>
                <li className={(currentTab == 2 ? tabActive : tabInactive)}>
                    <span
                        onClick={() => (setTab(2))}
                        className="flex items-center">
                        {currentTab > 2 ? checkIcon : <span className="me-2">3</span>}
                        Contract Definition
                    </span>
                </li>
            </ol>
            <div className="w-full flex content-center justify-center">
                <div className={(currentTab == 0 ? cardStyle : "hidden")}>
                    <h1 className="text-gaiaPurple font-bold text-center">Asset: Routing-Request</h1>
                    <JsonView value={asset}/>
                </div>
                <div className={(currentTab == 1 ? cardStyle : "hidden")}>
                    <h1 className="text-gaiaPurple font-bold text-center">Policy: Allow Access</h1>
                    <JsonView value={policy}/>
                </div>
                <div className={(currentTab == 2 ? cardStyle : "hidden")}>
                    <h1 className="text-gaiaPurple font-bold text-center">Contract Definition: Match Policy with
                        Asset</h1>
                    <JsonView value={contractDefinition}/>
                </div>
            </div>
        </div>
    );
}


export default GaiaxAssets;