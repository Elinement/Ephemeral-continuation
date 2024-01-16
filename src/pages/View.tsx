import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface ProxyWindow extends Window {
  eruda: any;
}
export default function View() {
  const { url } = useParams();
  const [siteUrl, setSiteUrl] = useState("");
  const [fullScreen, setFullScreen] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  function getProxy(): string {
    if (localStorage.getItem("proxy") === "ultraviolet") {
      return "/~/dark/";
    } else if (localStorage.getItem("proxy") === "ampere") {
      return "/~/light/";
    } else {
      return "/~/dark/";
    }
  }
  function onLoad() {
    if (frameRef.current!.contentWindow?.location.href) {
      if (localStorage.getItem("proxy") === "ultraviolet") {
        const site = frameRef
          .current!.contentWindow?.location.href.replace(
            window.location.origin,
            "",
          )
          .replace(window.__uv$config.prefix, "");
        setSiteUrl(decodeURIComponent(site.toString()));
      } else if (localStorage.getItem("proxy") === "ampere") {
        const site = frameRef
          .current!.contentWindow?.location.href.replace(
            window.location.origin,
            "",
          )
          .replace(window.__$ampere.config.prefix, "");
        setSiteUrl(decodeURIComponent(site.toString()));
      }
    }
  }
  function FullScreenIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#f8fafc"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
        />
      </svg>
    );
  }

  function ExitFullScreenIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="#f8fafc"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
        />
      </svg>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950" ref={pageRef}>
      <div className="absolute -translate-y-2 flex-row items-start space-x-4 p-5">
        <Button
          variant="ghost"
          onClick={() => {
            frameRef.current!.contentWindow?.history.back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#faf8fc"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            frameRef.current!.contentWindow?.history.forward();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#faf8fc"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            frameRef.current!.contentWindow?.location.reload();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#faf8fc"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#faf8fc"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </Button>
      </div>
      <Input
        id="input"
        className="absolute left-1/2 w-96 -translate-x-1/2 translate-y-3 flex-col pr-4 sm:w-[484px] lg:w-[584px]"
        value={siteUrl}
        onChange={(e) => {
          setSiteUrl(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (siteUrl.includes("http://") || siteUrl.includes("https://")) {
              frameRef.current!.src = getProxy() + siteUrl;
            } else if (siteUrl.includes(".")) {
              frameRef.current!.src = getProxy() + "https://" + siteUrl;
            } else {
              frameRef.current!.src =
                getProxy() + "https://google.com/search?q=" + siteUrl;
            }
          }
        }}
      />
      <div className="absolute right-1 -translate-y-2 flex-row items-start space-x-4 p-5">
        <Button
          variant="ghost"
          onClick={() => {
            const proxyWindow = frameRef.current!.contentWindow as ProxyWindow;

            const proxyDocument = frameRef.current!.contentDocument;

            if (!proxyWindow || !proxyDocument) return;

            if (proxyWindow.eruda?._isInit) {
              proxyWindow.eruda.destroy();
            } else {
              const script = proxyDocument.createElement("script");
              script.src = "https://cdn.jsdelivr.net/npm/eruda";
              script.onload = function () {
                if (!proxyWindow) return;
                proxyWindow.eruda.init({
                  defaults: {
                    displaySize: 45,
                    theme: "Atom One Dark",
                  },
                });
                proxyWindow.eruda.show();
              };
              proxyDocument.head.appendChild(script);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#faf8fc"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
            />
          </svg>
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            if (document.fullscreenElement) {
              document.exitFullscreen();
              setFullScreen(false);
            } else {
              pageRef.current!.requestFullscreen();
              setFullScreen(true);
            }
          }}
        >
          {fullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
        </Button>
      </div>
      <div className="h-[calc(100%_-_4rem)] w-full translate-y-16">
        <iframe
          src={getProxy() + url}
          className="h-full w-full border-none"
          ref={frameRef}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
