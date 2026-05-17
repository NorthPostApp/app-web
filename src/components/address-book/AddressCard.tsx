import { memo } from "react";
import clsx from "clsx";
import cn from "@/lib/cn";
import type { UpdateAction } from "@/apis/user";
import type { AddressItemSchema, AddressSchema } from "@/schemas/addresses";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

type AddressCardProps = {
  addressItem: AddressItemSchema;
  actionType?: UpdateAction;
  onClick?: () => void;
  loading?: boolean;
};

const styles = {
  card: clsx(
    "group relative border p-3 border-(--gray-4) shadow-(--base-shadow) rounded-2xl flex flex-col gap-2 overflow-hidden",
  ),
  name: clsx("leading-tight"),
  intro: clsx("text-xs overflow-hidden my-0.5 text-(--gray-9)"),
  addressBlock: clsx("text-[13px] text-(--gray-10)"),
  tagList: clsx("flex gap-1.5"),
  tag: clsx("text-xs px-2 py-0 rounded-full ring ring-(--gray-7)"),
  floatButton: clsx(
    "shadow-(--base-shadow) font-medium absolute text-2xl text-(--color-background) right-0 bottom-0 w-11 h-11 rounded-none rounded-tl-2xl bg-(--accent-8) translate-x-20 translate-y-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200 hover:cursor-pointer",
  ),
  addColor: clsx("bg-(--accent-8)"),
  removeColor: clsx("bg-rose-400"),
};

const parseAddress = (address: AddressSchema) => {
  return {
    buildingName: address.buildingName,
    addressLine: [address.line1, address.line2].filter(Boolean).join(" "),
    location: [address.city, address.region, address.country].filter(Boolean).join(", "),
  };
};

function AddressCard({ addressItem, actionType, onClick, loading }: AddressCardProps) {
  const parsedAddress = parseAddress(addressItem.address);
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{addressItem.name}</h3>
      <p className={styles.intro}>{addressItem.briefIntro}</p>
      <div className="flex-1" />
      <div className={styles.addressBlock}>
        <p>{parsedAddress.addressLine}</p>
        <p>{parsedAddress.location}</p>
      </div>
      <div className={styles.tagList}>
        {addressItem.tags.map((tag) => (
          <div key={`${addressItem.id}-${tag}`} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
      {actionType && (
        <Button
          className={cn(
            styles.floatButton,
            actionType === "add" && styles.addColor,
            actionType === "remove" && styles.removeColor,
          )}
          onClick={onClick}
        >
          {loading && <Spinner />}
          {!loading && (actionType === "add" ? "+" : "-")}
        </Button>
      )}
    </div>
  );
}

const MemoAddressCard = memo(AddressCard, (oldProps, newProps) => {
  const { addressItem: item, actionType, loading } = newProps;
  const {
    addressItem: oldItem,
    actionType: oldActionType,
    loading: oldLoading,
  } = oldProps;
  return item.id === oldItem.id && actionType === oldActionType && loading === oldLoading;
});

export default MemoAddressCard;
