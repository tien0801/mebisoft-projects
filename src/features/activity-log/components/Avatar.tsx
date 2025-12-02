"use client";

import Image from "next/image";

export const Avatar = ({ url }: { url: string }) => {
  return (
    <div className="rounded-lg overflow-hidden shrink-0 border border-gray-100 shadow-sm bg-gray-100">
      <Image
        src={url}
        alt="user-avatar"
        width={40}
        height={40}
        className="object-cover"
      />
    </div>
  );
};
