import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
type BreadCrumbLink = {
  path: string;
  label: string;
  active?: boolean;
}
type Props = {
  links: BreadCrumbLink[];
}
export default function AppBreadCrump({ links }: Props) {
  return <>
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, i) => {
          if (link.active) {
            return <React.Fragment key={link.label}>
              <BreadcrumbItem key={link.label} >
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              </BreadcrumbItem>
              {i < links.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          }
          return <React.Fragment key={link.label}>
            <BreadcrumbItem key={link.label} >
              <BreadcrumbLink href={link.path}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {i < links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        })}
      </BreadcrumbList>
    </Breadcrumb>
  </>
}