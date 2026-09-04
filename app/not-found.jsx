import Shell from "@/components/Shell";
import BackLink from "@/components/BackLink";
import Headline from "@/components/Headline";

export default function NotFound() {
  return (
    <Shell>
      <BackLink />
      <Headline className="mt-6">
        Nothing here. Probably a link I broke, possibly a page I deleted.
      </Headline>
    </Shell>
  );
}
