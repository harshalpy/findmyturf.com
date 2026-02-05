import PageLayout from "../components/PageLayout";
import TurfDetail from "../components/TurfDetail";

export default function TurfDetailPage() {
  return (
    <PageLayout>
      <div className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <TurfDetail />
        </div>
      </div>
    </PageLayout>
  );
}
