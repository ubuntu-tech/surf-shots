import SessionDetails from "@/components/SessionDetails/SessionDetails";

interface SessionPageProps {
    params: Promise<{
      id: string;
    }>;
}

async function SessionPage({ params }: SessionPageProps) {
    const id = (await params).id
    return (
      <SessionDetails id={id} />
    );
}
export default SessionPage