import { Search, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { GalleryFilters } from '@/types/sandwich';

interface FilterBarProps {
  filters: GalleryFilters;
  onFiltersChange: (filters: GalleryFilters) => void;
}

export const FilterBar = ({ filters, onFiltersChange }: FilterBarProps) => {
  // Generate month options for the past 12 months
  const getMonthOptions = () => {
    const months = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthValue = date.toISOString().slice(0, 7);
      const monthLabel = date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      });
      months.push({ value: monthValue, label: monthLabel });
    }
    return months;
  };

  const monthOptions = getMonthOptions();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchTerm: e.target.value,
    });
  };

  const handleMonthChange = (value: string) => {
    onFiltersChange({
      ...filters,
      month: value === 'all' ? undefined : value,
    });
  };

  const handleWinnersToggle = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      winnersOnly: checked,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search sandwiches..."
              value={filters.searchTerm || ''}
              onChange={handleSearchChange}
              className="pl-9"
            />
          </div>
        </div>

        {/* Month Filter */}
        <div className="space-y-2">
          <Label htmlFor="month">Month</Label>
          <Select
            value={filters.month || 'all'}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger id="month">
              <SelectValue placeholder="All months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All months</SelectItem>
              {monthOptions.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Winners Only Toggle */}
        <div className="space-y-2 flex items-end">
          <div className="flex items-center space-x-3 h-10 px-3 border rounded-md w-full">
            <Award className="w-4 h-4 text-yellow-500" />
            <Label htmlFor="winners-only" className="flex-1 cursor-pointer">
              Winners Only
            </Label>
            <Switch
              id="winners-only"
              checked={filters.winnersOnly}
              onCheckedChange={handleWinnersToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
