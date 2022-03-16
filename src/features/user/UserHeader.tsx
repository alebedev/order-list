import { useAppSelector } from "../../app/hooks";
import { selectUser } from "./userSlice";
import "./UserHeader.scss";

export function UserHeader() {
  const user = useAppSelector(selectUser);
  return (
    <h1 className="userHeader">
      {user.displayName} ({user.id})
    </h1>
  );
}
