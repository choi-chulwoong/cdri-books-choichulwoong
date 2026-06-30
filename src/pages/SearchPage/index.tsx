import EmptyState from '@/components/atom/EmptyState';
import SearchResultCount from '@/components/molecule/SearchResultCount';
import SearchSection from '@/components/organism/SearchSection';
import { useState } from 'react';

function SearchPage() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <main className="mx-auto flex w-[1000px] flex-col px-[20px]">
      <SearchSection
        className="mt-[80px]"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearch={() => {}}
      />

      <div className="mt-6">
        <SearchResultCount
          meta={{
            total_count: 0,
            pageable_count: 0,
            is_end: true,
          }}
        />
        <EmptyState message="검색된 결과가 없습니다." />
      </div>
    </main>
  );
}

export default SearchPage;
