"use client";

import { Pagination } from "flowbite-react";
import { useState } from "react";

export function CustomPagination({
  onPageChange,
  currentPage,
  totalPages,
}: {
  onPageChange: { (page: number): void };
  currentPage: number;
  totalPages: number;
}) {
  return (
    <div className="flex overflow-x-auto sm:justify-center mb-8">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  );
}
