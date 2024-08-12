import { Avatar, Box, Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import hljs from 'highlight.js/lib/core';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import csharp from 'highlight.js/lib/languages/csharp';
import ruby from 'highlight.js/lib/languages/ruby';
import php from 'highlight.js/lib/languages/php';
import go from 'highlight.js/lib/languages/go';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import rust from 'highlight.js/lib/languages/rust';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('java', java);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('ruby', ruby);
hljs.registerLanguage('php', php);
hljs.registerLanguage('go', go);
hljs.registerLanguage('swift', swift);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);

function codeExtraction(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
  return null;
}

function isCodeThere(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({ role, content }: { content: string; role: "user" | "assistant" }) => {
  const messageBlocks = codeExtraction(content);

  const auth = useAuth();
  return (
    role === "assistant" ?
      <Box sx={{
        display: "flex",
        p: 1.5,
        bgcolor: "#1f1f1f",
        my: 0.5,
        gap: 2,
        borderRadius: "10px"
      }}>

        <Avatar sx={{
          ml: "0",
          bgcolor: "white"
        }}>
          <img src="logo-cropped.png" alt="go-gpt" width={"30px"}></img>
        </Avatar>
        <Box>
          {!messageBlocks && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          )}
          {messageBlocks && messageBlocks.length > 0 && messageBlocks.map((block, index) =>
            isCodeThere(block) ? (
              <SyntaxHighlighter key={index} style={coldarkDark} language={hljs.highlightAuto(block).language || 'text'}>
                {block}
              </SyntaxHighlighter>
            ) : (
              <ReactMarkdown key={index} remarkPlugins={[remarkGfm]}>{block}</ReactMarkdown>
            )
          )}
        </Box>
      </Box> :
      <Box sx={{
        display: "flex",
        p: 1.5,
        bgcolor: "rgb(33, 56, 74)",
        gap: 2,
        my: 0.5,
        borderRadius: "10px"
      }}>

        <Avatar sx={{
          ml: "0",
          color: "white",
          bgcolor: "#000"
        }}>
          {auth?.user?.name && auth?.user?.name.split(" ").length > 1 ? (
            <>
              {auth.user.name.split(" ")[0][0]}
              {auth.user.name.split(" ")[1][0]}
            </>
          ) : (
            auth?.user?.name[0]
          )}
        </Avatar>
        <Box>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Box>
      </Box>
  )
}

export default ChatItem;
