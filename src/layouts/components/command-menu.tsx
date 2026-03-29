import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearch } from '@/core/contexts/search-context'

// import { useTheme } from '@/core/contexts/ThemeContextProvider'
import {
  IconArrowRightDashed,
} from '@tabler/icons-react'
// import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
// import { sidebarData } from './data/sidebar-data'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { stockSummaryQueryOptions } from '@/features/modules/voucher/stock_summary/data/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { Switch } from '@/components/ui/switch'


// import { ScrollArea } from './ui/scroll-area'

export function CommandMenu() {
  // const navigate = useNavigate()
  // const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const [searchMode, setSearchMode] = useState<"godown" | "item">("item")
  // const runCommand = React.useCallback(
  //   (command: () => unknown) => {
  //     setOpen(false)
  //     command()
  //   },
  //   [setOpen]
  // )

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <div className='p-2 border-b'>
        <div className="flex items-center justify-start gap-4">
          <span className="text-sm font-medium">
            Search in {searchMode === "item" ? "Items" : "Godowns"}
          </span>

          <Switch
            checked={searchMode === "godown"}
            onCheckedChange={(checked) =>
              setSearchMode(checked ? "godown" : "item")
            }
          />
        </div>
      <CommandInput placeholder='Type a command or search...' />
      </div>
      <CommandList className=" max-h-full">
        {searchMode === "godown" ? <ScrollAreaGodownComponent /> : <ScrollAreaItemComponent />}

        {/* <ScrollArea className='h-72 pr-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {sidebarData.navGroups.map((group) => (
            <CommandGroup key={group.title} heading={group.title}>
              {group.items.map((navItem, i) => {
                if (navItem.url)
                  return (
                    <CommandItem
                      key={`${navItem.url}-${i}`}
                      value={navItem.title}
                      onSelect={() => {
                        runCommand(() => navigate({ to: navItem.url }))
                      }}
                    >
                      <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                        <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
                      </div>
                      {navItem.title}
                    </CommandItem>
                  )

                return navItem.items?.map((subItem, i) => (
                  <CommandItem
                    key={`${subItem.url}-${i}`}
                    value={subItem.title}
                    onSelect={() => {
                      runCommand(() => navigate({ to: subItem.url }))
                    }}
                  >
                    <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                      <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
                    </div>
                    {subItem.title}
                  </CommandItem>
                ))
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <IconSun /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <IconMoon className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <IconDeviceLaptop />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea> */}



      </CommandList>
    </CommandDialog>
  )
}


const ScrollAreaGodownComponent = () => {
  const godownData = useQuery(stockSummaryQueryOptions('stock_in_hand_godown_wise'))
  console.log(godownData.data?.data);

  return (
    <ScrollArea className='h-72 pr-1'>
      <CommandEmpty>No results found.</CommandEmpty>
      {godownData.data?.data?.map((item: any) => (
        <CommandGroup key={item.godownName} heading={item.godownName}>
          {item.itemDetails.map((item: any, i: number) => (
            <CommandItem
              key={`${item.itemName}-${i}`}
              value={item.itemName}
              onSelect={() => {
                // runCommand(() => navigate({ to: navItem.url }))
              }}
            >
              <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
              </div>
              <div className='w-full flex flex-row justify-between'>
                <div>

                  {item.itemName}
                </div>
                <div>

                  {item.closingQuantity.toFixed(item.noOfDecimalPlaces ?? 3)} {item.unitCode}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </ScrollArea>
  )

}

const ScrollAreaItemComponent = () => {
  const itemData = useQuery(stockSummaryQueryOptions('stock_in_hand_item_wise'))
  console.log(itemData.data?.data);

  return (
    <ScrollArea className='h-72 pr-1'>
      <CommandEmpty>No results found.</CommandEmpty>
      {itemData.data?.data?.map((item: any) => (
        <CommandGroup key={item.itemName} heading={item.itemName}>
          {item.godownDetails.map((godown: any, i: number) => (
            <CommandItem
              key={`${godown.godownName}-${i}`}
              value={godown.godownName}
              onSelect={() => {
                // runCommand(() => navigate({ to: navItem.url }))
              }}
            >
              <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                <IconArrowRightDashed className='size-2 text-muted-foreground/80' />
              </div>
              <div className='w-full flex flex-row justify-between'>
                <div>

                  {godown.godownName}
                </div>
                <div>

                  {godown.closingQuantity.toFixed(item.noOfDecimalPlaces ?? 3)} {item.unitCode}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </ScrollArea>
  )

}