"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CategoryT, SubCategoryT } from "@/types";

// ----------------------- SubCategoryList -----------------------
const SubCategoryList = ({
  subcategories,
  isMobile
}: {
  subcategories?: SubCategoryT[];
  isMobile?: boolean;
}) => {
  const [openSubIds, setOpenSubIds] = useState<string[]>([]);
  const router = useRouter();

  const toggleSub = (id: string) => {
    setOpenSubIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSubCategoryClick = (subcategory: SubCategoryT) => {
    router.push(`/product/category/${subcategory._id}`);
  };

  const sortedSubcategories = subcategories
    ?.slice()
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  return (
    <ul className={`${isMobile ? "pl-4 ml-2" : "ml-3"} space-y-1 mt-1`}>
      {sortedSubcategories?.map((sub) => {
        const hasChildren = (sub.subcategories || []).length > 0;
        const isOpen = openSubIds.includes(sub._id);

        return (
          <li key={sub._id} className="group">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (hasChildren) toggleSub(sub._id);
                else handleSubCategoryClick(sub);
              }}
              className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-50 hover:text-blue-700 transition-all"
            >
              <span className="flex items-center gap-1.5">
                {hasChildren && (
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      isOpen ? "rotate-180 text-blue-600" : "text-gray-500"
                    }`}
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {sub.name}
                </span>
              </span>
            </button>

            {hasChildren && isOpen && (
              <SubCategoryList
                subcategories={sub.subcategories}
                isMobile={isMobile}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

// ----------------------- CategoryMenu -----------------------
export const CategoryMenu = ({
  menus,
  isMobile
}: {
  menus?: CategoryT[];
  isMobile?: boolean;
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const router = useRouter();

  const sortedMenus = menus
    ?.slice()
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const menusWithSortedSubcategories = sortedMenus?.map((menu) => ({
    ...menu,
    subcategories: (menu.subcategories || [])
      .slice()
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))
  }));

  const visibleMenus = menusWithSortedSubcategories?.slice(0, 7);
  const remainingMenus = menusWithSortedSubcategories?.slice(7);

  const handleCategoryClick = (category: CategoryT) => {
    router.push(`/product/category/${category._id}`);
  };

  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-1" : "flex items-center gap-6"
      }`}
    >
      {visibleMenus?.map((menu) => {
        const hasChildren = (menu.subcategories || []).length > 0;

        return (
          <div key={menu._id} className={`relative ${isMobile ? "" : "group"}`}>
            <button
              onClick={() => handleCategoryClick(menu)}
              className="flex items-center text-lg font-normal text-gray-800 hover:text-blue-700 transition-colors py-2 rounded-lg"
            >
              {menu.name}
              {hasChildren && (
                <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
              )}
            </button>

            {hasChildren && !isMobile && (
              <div className="absolute left-0 top-full mt-1 z-20 bg-white border border-gray-300 p-3 min-w-[220px] hidden group-hover:block rounded-lg shadow-lg">
                <SubCategoryList subcategories={menu.subcategories} />
              </div>
            )}

            {hasChildren && isMobile && (
              <SubCategoryList subcategories={menu.subcategories} isMobile />
            )}
          </div>
        );
      })}

      {remainingMenus?.length > 0 && (
        <div className={`relative ${isMobile ? "" : "ml-auto"}`}>
          <button
            onClick={() => setMoreOpen((prev) => !prev)}
            className="flex items-center gap-1.5 text-blue-700 font-medium px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            More
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                moreOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {moreOpen && (
            <div
              className={`${
                isMobile
                  ? "ml-3 mt-1 pl-3"
                  : "absolute right-0 top-full mt-2 z-20 bg-white border border-gray-300 p-3 min-w-[200px] rounded-lg shadow-lg"
              } flex flex-col gap-1`}
            >
              {remainingMenus?.map((menu) => {
                const hasChildren = (menu.subcategories || []).length > 0;
                return (
                  <div key={menu._id} className="relative group">
                    <button
                      onClick={() => handleCategoryClick(menu)}
                      className="flex items-center justify-between w-full text-left px-2 py-1.5 rounded-md text-gray-800 font-medium hover:text-blue-700 hover:bg-gray-50 transition-colors"
                      onMouseEnter={() =>
                        setOpenIds((prev) => [...prev, menu._id])
                      }
                      onMouseLeave={() =>
                        setOpenIds((prev) =>
                          prev.filter((id) => id !== menu._id)
                        )
                      }
                    >
                      <span>{menu.name}</span>
                      {hasChildren && <ChevronDown className="w-4 h-4" />}
                    </button>

                    {hasChildren && openIds.includes(menu._id) && (
                      <div className="absolute left-full top-0 ml-1 z-30 bg-white border border-gray-300 p-3 min-w-[200px] rounded-lg shadow-lg">
                        <SubCategoryList subcategories={menu.subcategories} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
