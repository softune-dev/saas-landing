import { redirect } from "next/navigation";

/** Old dedicated Add-Ons route — homepage `#addons` section is the showcase. */
export default function AddonsRedirectPage() {
  redirect("/#addons");
}
