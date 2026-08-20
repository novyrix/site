import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export function ArrowLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a className="arrow-link" href={href} target="_blank" rel="noreferrer">
        {children}
        <ArrowUpRight aria-hidden="true" weight="bold" />
      </a>
    );
  }

  return (
    <Link className="arrow-link" href={href}>
      {children}
      <ArrowUpRight aria-hidden="true" weight="bold" />
    </Link>
  );
}
