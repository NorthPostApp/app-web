import clsx from "clsx";
import type { AddressItemSchema, AddressSchema } from "@/schemas/addresses";

type AddressCardProps = {
  addressItem: AddressItemSchema;
};

const styles = {
  card: clsx("border p-2.5 border-(--gray-4) shadow rounded-2xl flex flex-col gap-2"),
  name: clsx("leading-tight"),
  intro: clsx("text-xs overflow-hidden text-ellipsis text-nowrap my-0.5 text-(--gray-9)"),
  addressBlock: clsx("text-[13px] text-(--gray-10)"),
  tagList: clsx("flex gap-1.5"),
  tag: clsx("text-xs px-2 py-0 rounded-full ring ring-(--gray-7)"),
};

const parseAddress = (address: AddressSchema) => {
  return {
    buildingName: address.buildingName,
    addressLine: `${address.line1} ${address.line2}`,
    city: `${address.city} ${address.region}`,
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
    </div>
  );
}
