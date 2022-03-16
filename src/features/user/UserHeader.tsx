import {useAppSelector} from "../../app/hooks";
import {selectUser} from "./userSlice";


export function UserHeader() {
    const user = useAppSelector(selectUser);
    return <h2>{user.displayName} ({user.id})</h2>
}
