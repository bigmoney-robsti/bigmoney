import { useState } from "react";
import { AssetType } from "types/AssetType";
import { AssetItem } from "types/AssetItem";

export default function DebtList() {
  const [assetItems, setAssetItems] = useState<AssetItem[] | null>([
    { type: AssetType.BankAssets, label: "Penger i banken", value: 100 },
    { type: AssetType.InvestmentAssets, label: "Penger i fond", value: 100 },
    { type: AssetType.Property, label: "Verdi på bolig", value: 100 },
    { type: AssetType.Property, label: "Verdi på bil", value: 100 },
    { type: AssetType.Property, label: "Verdi på mc", value: 100 },
  ]);

  return (
    <ul>
      {assetItems?.map((item, index) => (
        <li key={index}>{item.label}</li>
      ))}
    </ul>
  );
}
