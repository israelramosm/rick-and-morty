"use client";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function DetailModal({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const onClose = () => router.back();

  return (
    <Modal show dismissible onClose={onClose} size="2xl">
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
