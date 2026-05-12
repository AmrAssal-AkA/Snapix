import * as documentPicker from "expo-document-picker";
import * as filsystem from "expo-file-system";
import supabase from "../lib/supabase";
import { useState } from "react";

export function useFileUpload() {
  const [document, setDocument] = useState(null);

  const handlePickDocument = async ({ onFileUploaded }) => {
    try {
      const result = await documentPicker.getDocumentAsync({
        type: "video/*",
        multiple: false,
      });
      if (result.canceled) {
        console.log("Document selection cancelled");
        return;
      }
      if (result.assets?.[0]) {
        const file = result.assets[0];
        setDocument(file);
        onFileUploaded(file);
      }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  return { handlePickDocument, document };
}
