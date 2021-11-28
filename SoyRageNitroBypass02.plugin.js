/**
 * @name SoyRageNitroBypass02
 * @version 0.2
 * @authorLink https://www.youtube.com/channel/UCfLzjIlbadSJnpymgjtRrCA
 * @donate https://paypal.me/rageservers
 * @website https://www.youtube.com/channel/UCfLzjIlbadSJnpymgjtRrCA
 * @source https://raw.githubusercontent.com/SoyRage/DiscordNitroBypassPlugins/
 * @updateUrl https://soyrage.github.io/DiscordNitroBypassPlugins/SoyRageNitroBypass02.plugin.js
 */

/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(No hagas esto!)", 0, "Soy u nplugin sigue el video no me abras asi porque si", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "Ya estaba instalado", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

class SoyRageNitroBypass02 {
    getName() {
        return "SoyRageNitroBypass02";
    }
    getDescription() {
        return "Emojis de NITRO & COMPARTIR PANTALLA, Sin restriccion (DISCORD NITRO BYPASS)";
    }
    getVersion() {
        return "0.2";
    }
    getAuthor() {
        return "SoyRage";
    }
    getUpdateUrl() {
        return "https://soyrage.github.io/DiscordNitroBypassPlugins/SoyRageNitroBypass02.plugin.js";
    }
    load() {
        BdApi.showConfirmationModal("Nueva VERSION", `Actualiza para que el NITRO funcione perfectamente By`, {
            confirmText: "Download Now",
            cancelText: "Cancel",
            onConfirm: () => {
                require("request").get("https://soyrage.github.io/DiscordNitroBypassPlugins/SoyRageNitroBypass02.plugin.js", async (error, response, body) => {
                    if (error) return require("electron").shell.openExternal("https://drive.google.com/u/0/uc?export=download&confirm=Cnoq&id=12BOmUF7GzgyFJsBBtnDZx5TKoz9UB_P2");
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "SoyRageNitroBypass02.plugin.js"), body, r));
                });
            }
        });
    }
    stop() {
        document.removeEventListener("click", this.link);
    }
    start() {
        document.addEventListener("click", this.link);
        const mod = BdApi.findModuleByProps("getCurrentUser")
        let tries;
        const checkExist = setInterval(() => {
            let cUser;
            if ((cUser = mod.getCurrentUser()) != undefined) {
                cUser.premiumType = 0;
                tries = 10;
            }
            if (++tries > 10)
                clearInterval(checkExist);
        }, 1000);
    }
      
    onSwitch() {
        const
            useFileUpload = false,
            div = document.getElementsByClassName("name-3YKhmS")[0],
            serverName = div != undefined ? div.innerHTML : "noServer",
            btnContainer = document.getElementsByClassName("buttons-3JBrkn")[0].children,
            btn = btnContainer[btnContainer.length - 1];

        if (btn != null)
            btn.onclick = () => {

                const checkExist = setInterval(function() {
                    const scroller = document.getElementsByClassName("listItems-1uJgMC")[0];
                    if (scroller == null) return;
                    clearInterval(checkExist);
                    scroller.parentElement.onclick = (e) => {
                        const
                            target = e.target,
                            src = target.firstChild.src;
                        if (src.slice(-7, -4) == "gif" || target.parentElement.parentElement.children[0].firstChild.children[1].innerHTML != serverName) {
                            const curChannel = BdApi.findModuleByProps("getLastSelectedChannelId").getChannelId();
                            var url = src.slice(0, -4);
                            var ext = url.slice(url.length - 3);

                            function upLoad(blob) {
                                BdApi.findModuleByProps("instantBatchUpload").instantBatchUpload(curChannel, [new File([blob], 'oSumAtrIX.' + ext, blob)]);
                            }

                            var txtBar = document.getElementsByClassName("textArea-12jD-V")[0];
                            url = url + "?size=40";
                            useFileUpload ?
                                fetch(url)
                                .then(res => res.blob()).then(upLoad) :
                                BdApi.findModuleByProps("sendMessage").sendMessage(curChannel, {
                                    content: url
                                });



                        }

                    }
                }, 100);

            }
    }
}
