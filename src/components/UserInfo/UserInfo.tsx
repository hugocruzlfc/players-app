import React from "react";
import Image from "next/image";

export interface UserInfoProps {
  user: any;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div>
      <p className="font-bold">Posted By :</p>

      <div className="flex gap-2 items-center mb-3 mt-2">
        {user?.userImage ? (
          <Image
            src={user?.userImage}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : null}
        <div>
          <h2 className="text-[14px] font-medium">{user?.userName}</h2>
          <h2 className="text-[14px] font-light">{user?.email}</h2>
        </div>
      </div>
    </div>
  );
};
