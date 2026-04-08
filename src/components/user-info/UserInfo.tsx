import { useAtomValue, useSetAtom } from "jotai";
import { SunMoon, Mail, Bell } from "lucide-react";
import { userAtom } from "@/atoms/userAtoms";
import { appConfigAtom, derivedThemeAtom } from "@/atoms/appConfigAtom";
import Button from "@/components/ui/Button";
import UserSettingsPopover from "@/components/user-info/UserSettingsPopover";
import TooltipButton from "@/components/ui/TooltipButton";
import "./UserInfo.css";
import { Tooltip } from "@base-ui/react";

const ICON_SIZE = 22;

export default function UserInfo() {
  const userData = useAtomValue(userAtom);
  const appConfigData = useAtomValue(appConfigAtom);
  const switchTheme = useSetAtom(derivedThemeAtom);
  return (
    <div className="user-info">
      <img src={userData?.imageUrl} className="rounded-full"></img>
      <div className="user-info__body">
        <p className="text-lg font-bold px-3">{userData?.displayName}</p>
        <Tooltip.Provider delay={100}>
          <div className="user-info__body__controls">
            <Button className="group">
              <Mail size={ICON_SIZE} className="user-info__body__svg" />
            </Button>
            <Button className="group">
              <Bell size={ICON_SIZE} className="user-info__body__svg" />
            </Button>
            <TooltipButton
              render={
                <Button
                  className="group"
                  onClick={switchTheme}
                  data-testid="user-info__button__theme"
                >
                  <SunMoon size={ICON_SIZE} className="user-info__body__svg" />
                </Button>
              }
              tooltip={<p className="text-sm">{appConfigData.theme}</p>}
              closeOnClick={false}
              side={"bottom"}
            />
            <UserSettingsPopover iconSize={ICON_SIZE} />
          </div>
        </Tooltip.Provider>
      </div>
    </div>
  );
}
