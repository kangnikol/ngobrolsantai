// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react"
import axios from "axios"
import Loading from "./Loading"
import Error from "./Error"

const Ping = () => {
  const [serverData, setServerData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    axios
      .get("https://foxnola-server.vercel.app/api/ping")
      .then((response) => setServerData(response.data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) return Error(error)
  if (!serverData) return Loading

  const cpyTxt = () => {
    const copyText = "FoxNola.aternos.me:64523"
    navigator.clipboard.writeText(copyText).then(() => setCopied(true))
    setTimeout(() => setCopied(false), 1000).catch((err) =>
      console.error("Error copying text:", err)
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-base text-text">
      <div className="bg-surface0 p-4 rounded-lg w-1/2">
        <div className="bb-text border-b">
          <span className="text-2xl font-bold text-yellow pb-4">
            FoxNola&apos;s Minecraft Server
          </span>
          <p className="text-xs pb-4 text-surface2">
            A Minecraft server that allows crossplay between Java and Bedrock
            editions (including Pocket Edition).
          </p>
        </div>
        <div className="flex pt-4 gap-6 justify-between">
          <div className="w-1/2 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-yellow">Server Status</h2>
            <div className="flex gap-4">
              {serverData.favicon && (
                <img
                  src={serverData.favicon}
                  alt="Server Favicon"
                  className="w-16 h-16"
                />
              )}
              <div className="flex flex-col">
                <p>
                  <strong>IP:</strong> FoxNola.aternos.me:64523{" "}
                  <button onClick={cpyTxt}>
                    {copied ? (
                      <h2 className="text-yellow animate-fade text-xs">
                        ✔ Copied!
                      </h2>
                    ) : (
                      <ion-icon name="copy-outline"></ion-icon>
                    )}
                  </button>
                </p>
                <p>
                  <strong>Status: </strong>
                  <strong
                    className={
                      serverData.version?.name ? "text-green" : "text-red"
                    }
                  >
                    {serverData.version?.name
                      ? `${serverData.version.name}`
                      : "Offline! Contact the server admin."}
                  </strong>
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://discord.gg/ngobrolsantai" target="_blank">
                <button className="p-2 bg-yellow text-base rounded-md font-semibold">
                  Join Discord!
                </button>
              </a>
              <a
                href="https://discordapp.com/users/1218085771580276757"
                target="_blank"
              >
                <button className="p-2 bg-yellow text-base rounded-md font-semibold">
                  Admin Contact
                </button>
              </a>
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className="text-xl font-semibold text-yellow">Players</div>
            <span>
              <strong>Online:</strong> {serverData.players.online} /{" "}
              {serverData.players.max}
            </span>
            <div className="bg-mantle pb-4 pl-4 pr-4 pt-2 rounded-md">
              <p className="pb-2 underline">List Online:</p>
              {serverData.players.sample &&
                serverData.players.sample.length > 0 && (
                  <ul>
                    {serverData.players.sample.map((player, index) => (
                      <li key={index}>{player.name}</li>
                    ))}
                  </ul>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ping
