import { memo } from "react";

import { useNavigate } from "@remix-run/react";
import { Th, Table, THead, EmptyRow, Td, Tr } from "ui";

// import { PostgrestError } from "@supabase/supabase-js";
// import { formatISO9075 } from "date-fns";
import type { ICampaigns } from "~/modules/campaign/queries";

const CampaignDataRow: React.FC<{
  campaign: ICampaigns;
  checked: boolean;
  onChecked: () => void;
}> = memo(function CampaignDataRow({ campaign, checked, onChecked }) {
  const navigate = useNavigate();

  function goToCampaign() {
    navigate(`/campaigns/${campaign.id}`);
  }

  return (
    <Tr
      className="cursor-pointer"
      onClick={goToCampaign}
    >
      <Td>
        <span className="relative text-left font-bold text-stone-900 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-primary-500 before:transition group-hover:text-primary-500 group-hover:transition-colors group-hover:before:scale-x-100 group-hover:before:delay-200">
          {campaign.title}
        </span>
      </Td>
      <Td>{new Date(campaign.startDate).toISOString()}</Td>
      <Td>
        {campaign.endDate ? new Date(campaign.endDate).toISOString() : "-"}
      </Td>
      <Td>
        {campaign.categories.map((cat) => (
          <span
            key={cat.id}
            className="rounded-full border border-stone-300 bg-stone-300 px-3 py-1 text-xs font-medium text-stone-800"
          >
            {cat.name}
          </span>
        ))}
      </Td>
    </Tr>
  );
});

export function CampaignsTableBody({ campaigns }: { campaigns: ICampaigns[] }) {
  if (campaigns.length < 1) {
    return (
      <EmptyRow
        colSpan={6}
        message="Wybrany klient nie posiada jeszcze kampanii które mogłyby się tutaj pojawić. Dodaj pierwszą kampanię, a pojawi się na tej liście."
      />
    );
  }

  return (
    <>
      {campaigns.map((campaign) => (
        <CampaignDataRow
          key={campaign.id}
          campaign={campaign}
          checked={false}
          onChecked={() => void 0}
        />
      ))}
    </>
  );
}

export function CampaignsTable({ children }: React.PropsWithChildren) {
  return (
    <>
      <Table>
        <THead>
          <Th>Nazwa</Th>
          <Th>Początek</Th>
          <Th>Koniec</Th>
          <Th>Kategoria</Th>
        </THead>
        <tbody>{children}</tbody>
      </Table>
    </>
  );
}
