import { Wizard } from "@/components/Wizard";
import type { Historia } from "@/lib/types";
import historia from "@/content/historia-fundacao.json";

export default function Home() {
  return <Wizard historia={historia as Historia} />;
}
