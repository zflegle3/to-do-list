import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ClosedSvg } from '../images/icons/closed.svg';
import { ReactComponent as OpenSvg } from '../images/icons/open.svg';

function Header (props) {
    //props.openState
    //props.toggleNav()

    if (props.openState) {
        return (
            <div className={"header"}>
                <OpenSvg  onClick={props.toggleNav}/>
                <p>To Do Tracker</p>
            </div>
        );
    } else {
        return (
            <div className={"header"}>
                <ClosedSvg onClick={props.toggleNav}/>
                <p>To Do Tracker</p>
            </div>
        );
    }

}


export default Header;