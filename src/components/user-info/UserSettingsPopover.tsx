import { CircleUser } from "lucide-react";
import { LANGUAGES_LIST } from "@/consts/app-config";
import { signOut } from "@/apis/auth";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Popover from "@/components/ui/Popover";
import { useAtomValue, useSetAtom } from "jotai";
import { appConfigAtom, derivedLanguageAtom } from "@/atoms/appConfigAtom";
import type { AppConfigSchema } from "@/consts/app-config";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

type UserSettingsPopoverProps = {
  iconSize: number;
};

const styles = {
  icon: clsx(
    "group-hover:stroke-(--accent-8) stroke-(--gray-8) mx-2 stroke-[1.5px] group-hover:stroke-2",
  ),
  popover: clsx("text-sm flex flex-col justify-center gap-3"),
  section: clsx("flex gap-3 justify-between items-center"),
  logOutButton: clsx("bg-(--gray-a3)"),
};

export default function UserSettingsPopover({ iconSize = 20 }: UserSettingsPopoverProps) {
  const { t } = useTranslation();
  const appConfig = useAtomValue(appConfigAtom);
  const updateLanguage = useSetAtom(derivedLanguageAtom);
  return (
    <Popover
      title={t("settings.title")}
      trigger={<CircleUser size={iconSize} className={styles.icon} />}
    >
      <div className={styles.popover}>
        <div className={styles.section}>
          <p>{t("settings.language")}</p>
          <Select
            items={LANGUAGES_LIST}
            activeValue={appConfig.language}
            onValueChange={(value) =>
              value && updateLanguage(value as AppConfigSchema["language"])
            }
            alignItemWithTrigger={true}
            size="sm"
          />
        </div>
        <Button className={styles.logOutButton} onClick={signOut}>
          {t("settings.logOut")}
        </Button>
      </div>
    </Popover>
  );
}
