import { useAtomValue, useSetAtom } from "jotai";
import { SunMoon, Mail, Bell } from "lucide-react";
import { userAtom } from "@/atoms/userAtoms";
import { appConfigAtom, derivedThemeAtom } from "@/atoms/appConfigAtom";
import Button from "@/components/ui/Button";
import UserSettingsPopover from "@/components/user-info/UserSettingsPopover";
import TooltipButton from "@/components/ui/TooltipButton";
import { Tooltip } from "@base-ui/react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const ICON_SIZE = 22;

const styles = {
  body: clsx("w-96 h-30 flex justify-between p-5 shadow-(--base-shadow) rounded-3xl"),
  avatar: clsx("rounded-full"),
  content: clsx("flex flex-col justify-between items-end"),
  displayName: clsx("text-lg font-bold px-3"),
  controls: clsx(
    "flex items-center justify-between px-3 py-0.5 rounded-2xl inset-shadow-(--base-shadow-inset)",
  ),
  icon: clsx(
    "group-hover:stroke-(--accent-8) stroke-(--gray-8) mx-2 stroke-[1.5px] group-hover:stroke-2",
  ),
  tooltip: clsx("text-sm"),
};

export default function UserInfo() {
  const userData = useAtomValue(userAtom);
  const appConfigData = useAtomValue(appConfigAtom);
  const switchTheme = useSetAtom(derivedThemeAtom);
  const { t } = useTranslation();
  return (
    <div className={styles.body}>
      <img src={userData?.imageUrl} className={styles.avatar}></img>
      <div className={styles.content}>
        <p className={styles.displayName}>{userData?.displayName}</p>
        <Tooltip.Provider delay={100}>
          <div className={styles.controls}>
            <Button className="group">
              <Mail size={ICON_SIZE} className={styles.icon} />
            </Button>
            <Button className="group">
              <Bell size={ICON_SIZE} className={styles.icon} />
            </Button>
            <TooltipButton
              render={
                <Button
                  className="group"
                  onClick={switchTheme}
                  data-testid="user-info__button__theme"
                >
                  <SunMoon size={ICON_SIZE} className={styles.icon} />
                </Button>
              }
              tooltip={
                <p className={styles.tooltip}>
                  {t(`settings.theme.${appConfigData.theme}`)}
                </p>
              }
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
