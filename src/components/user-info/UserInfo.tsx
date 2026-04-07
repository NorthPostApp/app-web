import { useAtomValue } from "jotai";
import { SunMoon, Mail, Bell, CircleUser } from "lucide-react";
import { userAtom } from "@/atoms/userAtoms";
import Button from "@/components/ui/Button";
import "./UserInfo.css";

const ICON_SIZE = 22;

export default function UserInfo() {
  const userData = useAtomValue(userAtom);
  console.log(userData);
  return (
    <div className="user-info">
      <img src={userData?.imageUrl} className="rounded-full"></img>
      <div className="user-info__body">
        <p className="text-lg font-bold px-3">{userData?.displayName}</p>
        <div className="user-info__body__controls">
          <Button className="group">
            <Mail size={ICON_SIZE} className="user-info__body__svg" />
          </Button>
          <Button className="group">
            <Bell size={ICON_SIZE} className="user-info__body__svg" />
          </Button>
          <Button className="group">
            <SunMoon size={ICON_SIZE} className="user-info__body__svg" />
          </Button>
          <Button className="group">
            <CircleUser size={ICON_SIZE} className="user-info__body__svg" />
          </Button>
        </div>
      </div>
    </div>
  );
}
