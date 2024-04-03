import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
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
            return <>
              <BreadcrumbItem key={link.label} >
                <BreadcrumbPage>{link.label}</BreadcrumbPage>
              </BreadcrumbItem>
              {i < links.length - 1 && <BreadcrumbSeparator />}
            </>
          }
          return <>
            <BreadcrumbItem key={link.label} >
              <BreadcrumbLink href={link.path}>{link.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {i < links.length - 1 && <BreadcrumbSeparator />}
          </>
        })}
      </BreadcrumbList>
    </Breadcrumb>
  </>
}