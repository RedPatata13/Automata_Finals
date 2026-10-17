import { LanguageOperations } from "@/components/LanguageOperations";
import { PageHeader } from "@/components/PageHeader";

export const instant = false;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 lg:min-h-0 lg:flex-1 lg:self-start">
      <PageHeader
        title="Language Operations"
        description="Explore how sets of strings combine through fundamental language operations."
      />

      <div className="flex flex-col gap-6 lg:min-h-0 lg:flex-1">
        <LanguageOperations />
      </div>
    </div>
  );
}
