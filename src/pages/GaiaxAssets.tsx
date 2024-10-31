import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function GaiaxAssets() {
    const [currentTab, setTab] = useState(0);

    const checkIcon = <FontAwesomeIcon icon={faCircleCheck} className="w-3.5 h-3.5 mr-2"/>
    const stateLine = "sm:after:content-[''] md:w-full after:w-full after:h-1 after:border-b after:border-gaiaPurple after:border-1 after:hidden sm:after:inline-block after:mx-4 xl:after:mx-6 ";
    const tabDefault = "flex items-center ";
    const tabActive = tabDefault + " text-tuGreen";
    const tabInactive = tabDefault + " text-gaiaPurple";

    return (
        <div className="content-center justify-center">
            <ol className="flex items-center w-full text-sm font-medium text-center">
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

        </div>
    );
}


export default GaiaxAssets;