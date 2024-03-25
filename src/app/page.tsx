"use client";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { FolderOpen } from "lucide-react";
import { useState } from "react";
export default function Home() {
	const [selectedDate, setSelectedDate] = useState(new Date());
	return (
		<div className='h-screen w-full flex flex-col gap-4 items-center p-8 mt-8'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink href='/'>Home</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>anass</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink href='/docs/components'>
							Components
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<Sheet>
				<SheetTrigger>
					<Button size='lg' className='flex gap-2'>
						Open Menu
						<FolderOpen />
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Menu</SheetTitle>
						<SheetClose />
					</SheetHeader>
					<div className='p-4'>
						<p className='text-gray-600'>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Fugiat cumque laborum nihil explicabo quas
							repellat, mollitia dolore. Error, illum totam,
							minima maiores magnam earum ad, nam reiciendis
							recusandae natus amet.
						</p>
					</div>
				</SheetContent>
			</Sheet>
			<Calendar
				onDayClick={setSelectedDate}
				selected={{
					from: selectedDate,
					to: new Date(selectedDate.getTime() + 1000 * 60),
				}}
			/>
		</div>
	);
}
