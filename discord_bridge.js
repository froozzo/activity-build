(async () => {

    // ESPERAR a que DiscordSDK exista
    const waitForSDK = () => new Promise(resolve => {
        let attempts = 0;
        const check = () => {
            if (window.DiscordSDK) resolve(window.DiscordSDK);
            else if (attempts++ < 50) setTimeout(check, 100);
            else resolve(null);
        };
        check();
    });

    const DiscordSDK = await waitForSDK();

    if (!DiscordSDK) {
        console.error("❌ DiscordSDK no cargó.");
        return;
    }

    console.log("✅ DiscordSDK detectado");

    // Inicializar SDK con tu APP ID
    const sdk = new DiscordSDK("1443000817639755947");

    await sdk.ready();

    console.log("🔄 Autenticando...");

    const auth = await sdk.commands.authenticate({});

    if (auth && auth.user) {
        console.log("✅ Usuario autenticado:", auth.user.username);

        window.discordUserID = auth.user.id;
        window.discordUsername = auth.user.username;

        const frame = document.getElementById("game-frame").contentWindow;

        frame.postMessage({
            type: "discord-auth",
            user: auth.user
        }, "*");

    } else {
        console.error("❌ No se pudo autenticar al usuario.");
    }

})();
