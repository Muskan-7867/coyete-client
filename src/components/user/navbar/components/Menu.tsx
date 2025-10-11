"use client";

import { ChevronDown, ChevronRight, Folder } from "lucide-react";

import { CategoryT, SubCategoryT } from "@/types";
import { useState } from "react";

const SubCategoryList = ({
  subcategories,
  isMobile
}: {
  subcategories?: SubCategoryT[];
  isMobile?: boolean;
}) => {
  const [openSubIds, setOpenSubIds] = useState<string[]>([]);

  const toggleSub = (id: string) => {
    setOpenSubIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <ul
      className={`${
        isMobile ? "pl-4 border-l border-gray-200" : "ml-4"
      } space-y-1`}
    >
      {(subcategories || []).map((sub) => {
        const hasChildren = (sub.subcategories || []).length > 0;
        const isOpen = openSubIds.includes(sub._id);

        return (
          <li key={sub._id}>
            <button
              onClick={() => hasChildren && toggleSub(sub._id)}
              className="flex items-center gap-2 w-full text-left text-gray-700 hover:text-blue-600 transition-colors"
            >
              {hasChildren ? (
                isOpen ? (
                  <ChevronDown className="w-3 h-3" />
                ) : (
                  <ChevronRight className="w-3 h-3" />
                )
              ) : (
                <Folder className="w-3 h-3 text-gray-400" />
              )}
              {sub.name}
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

export const CategoryMenu = ({
  menus,
  isMobile
}: {
  menus?: CategoryT[];
  isMobile?: boolean;
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const visibleMenus = menus?.slice(0, 7);
  const remainingMenus = menus?.slice(7);
  const [openIds, setOpenIds] = useState<string[]>([]);


  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-2" : "flex items-center gap-4"
      }`}
    >
      {visibleMenus?.map((menu) => {
        const hasChildren = (menu.subcategories || []).length > 0;

        return (
          <div key={menu._id} className={`relative ${isMobile ? "" : "group"}`}>
            <button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600 transition-colors w-full text-left">
              {menu.name}
              {hasChildren && <ChevronDown className="w-4 h-4" />}
            </button>

            {hasChildren && !isMobile && (
              <div className="absolute left-0 top-full mt-1 z-10 bg-white border border-gray-200 p-2 min-w-[200px] hidden group-hover:block rounded-md shadow-md">
                <SubCategoryList subcategories={menu.subcategories} />
              </div>
            )}

            {hasChildren && isMobile && (
              <SubCategoryList
                subcategories={menu.subcategories}
                isMobile={true}
              />
            )}
          </div>
        );
      })}

      {remainingMenus && remainingMenus.length > 0 && (
        <div className={`relative ${isMobile ? "" : "ml-auto"}`}>
          <button
            onClick={() => setMoreOpen((prev) => !prev)}
            className="flex items-center gap-1 text-blue-600 font-medium hover:underline transition-colors w-full text-left"
          >
            More...
            <ChevronDown className="w-4 h-4" />
          </button>

          {moreOpen && (
            <div
              className={`${
                isMobile ? "ml-2 mt-1" : "absolute right-0 top-full mt-1"
              } z-10 bg-white border border-gray-200 p-2 min-w-[200px] rounded-md shadow-md flex flex-col gap-1`}
            >
              {remainingMenus.map((menu) => {
                const hasChildren = (menu.subcategories || []).length > 0;
                return (
                  <div
                    key={menu._id}
                    className="relative"
                    onMouseEnter={() =>
                      setOpenIds((prev) => [...prev, menu._id])
                    }
                    onMouseLeave={() =>
                      setOpenIds((prev) => prev.filter((id) => id !== menu._id))
                    }
                  >
                    <button className="flex items-center gap-1 text-gray-800 font-medium hover:text-blue-600 transition-colors">
                      {menu.name}
                      {hasChildren && <ChevronDown className="w-4 h-4" />}
                    </button>

                    {hasChildren && openIds.includes(menu._id) && (
                      <div className="absolute left-0 top-full mt-1 z-10 bg-white border border-gray-200 p-2 min-w-[200px] rounded-md shadow-md">
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
