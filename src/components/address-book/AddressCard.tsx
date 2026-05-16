import clsx from "clsx";
import type { AddressItemSchema, AddressSchema } from "@/schemas/addresses";
import Button from "@/components/ui/Button";

type AddressCardProps = {
  addressItem: AddressItemSchema;
};

const styles = {
  card: clsx(
    "group relative border p-3 border-(--gray-4) shadow-(--base-shadow) rounded-2xl flex flex-col gap-2 overflow-hidden",
  ),
  name: clsx("leading-tight"),
  intro: clsx("text-xs overflow-hidden text-ellipsis text-nowrap my-0.5 text-(--gray-9)"),
  addressBlock: clsx("text-[13px] text-(--gray-10)"),
  tagList: clsx("flex gap-1.5"),
  tag: clsx("text-xs px-2 py-0 rounded-full ring ring-(--gray-7)"),
  floatButton: clsx(
    "shadow-(--base-shadow) font-medium absolute text-2xl text-(--color-background) right-0 bottom-0 w-11 h-11 rounded-none rounded-tl-2xl  bg-(--accent-8) translate-x-20 translate-y-20 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-200 hover:cursor-pointer",
  ),
};

const parseAddress = (address: AddressSchema) => {
  return {
    buildingName: address.buildingName,
    addressLine: [address.line1, address.line2].filter(Boolean).join(" "),
    city: [address.city, address.region].filter(Boolean).join(" "),
    country: address.country,
  };
};

export default function AddressCard({ addressItem }: AddressCardProps) {
  const parsedAddress = parseAddress(addressItem.address);
  return (
    <div className={styles.card}>
      <h3 className={styles.name}>{addressItem.name}</h3>
      <p className={styles.intro}>{addressItem.briefIntro}</p>
      <div className={styles.addressBlock}>
        <p>{parsedAddress.addressLine}</p>
        <p>{parsedAddress.city}</p>
        <p>{parsedAddress.country}</p>
      </div>
      <div className={styles.tagList}>
        {addressItem.tags.map((tag) => (
          <div key={`${addressItem.id}-${tag}`} className={styles.tag}>
            {tag}
          </div>
        ))}
      </div>
      <Button className={styles.floatButton}>+</Button>
    </div>
  );
}
