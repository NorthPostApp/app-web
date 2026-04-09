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

type UserSettingsPopoverProps = {
  iconSize: number;
};

export default function UserSettingsPopover({ iconSize = 20 }: UserSettingsPopoverProps) {
  const { t } = useTranslation();
  const appConfig = useAtomValue(appConfigAtom);
  const updateLanguage = useSetAtom(derivedLanguageAtom);
  return (
    <Popover
      title={t("settings.title")}
      trigger={<CircleUser size={iconSize} className="user-info__body__svg" />}
    >
      <div className="user-info__settings__popover">
        <div className="user-info__settings__popover__section">
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
        <Button className="bg-(--gray-a3)" onClick={signOut}>
          {t("settings.logOut")}
        </Button>
      </div>
    </Popover>
  );
}
