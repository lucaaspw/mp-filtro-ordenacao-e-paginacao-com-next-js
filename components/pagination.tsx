'use client'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  links: {
    url: string;
    label: string;
    active: boolean;
    id: number;
  }[]
  lastPage: number;
}
export default function Pagination({ links, lastPage }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  function handlePaginationClick(valuePage: number) {
    const params = new URLSearchParams(searchParams);
    if (valuePage > 1) {
      if(valuePage < 1 || valuePage > lastPage){
        params.set('page', '1')
      }else{
        params.set('page', valuePage.toString())
      }
    } else {
      params.delete('page')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem className={`${links[0].url ? 'cursor-pointer': 'hidden'}`} onClick={() => handlePaginationClick(Number(searchParams.get('page') || 1) - 1)}>
          <PaginationPrevious />
        </PaginationItem>
        {
          links.map((link) => {
            if (link.label.includes('Anterior') || link.label.includes('Próximo')) {
              return null
            }

            if (link.label === '...') {
              return (
                <PaginationItem key={link.id} className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={link.id} className="hidden md:inline-flex cursor-pointer">
                <PaginationLink onClick={() => handlePaginationClick(Number(link.label) || 1)} isActive={link.active}>{link.label}</PaginationLink>
              </PaginationItem>
            )
          })}
        <PaginationItem className='cursor-pointer' onClick={() =>  handlePaginationClick(Number(searchParams.get('page')) + 1)}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
