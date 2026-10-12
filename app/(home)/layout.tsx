import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AdminPanelLayout>
      <ContentLayout title="FormalLab">{children}</ContentLayout>
    </AdminPanelLayout>
  );
}
