import SessionDetails from "@/components/SessionDetails/SessionDetails";

interface SessionPageProps {
    params: {
      id: string;
    };
}

async function SessionPage({ params }: SessionPageProps) {
    return (
      <SessionDetails id={params.id} />
    );
}
export default SessionPage