local jobId, headType, format, x, y, baseUrl, assetId = ...

print(("[%s] Started RenderJob for type '%s' with assetId %d"):format(jobId, headType, assetId))

game:GetService("ScriptInformationProvider"):SetAssetUrl(baseUrl .. "/asset/")
game:GetService("InsertService"):SetAssetUrl(baseUrl .. "/asset/?id=%d")
game:GetService("InsertService"):SetAssetVersionUrl(baseUrl .. "/Asset/?assetversionid=%d")
game:GetService("ContentProvider"):SetBaseUrl(baseUrl)
game:GetService("ScriptContext").ScriptsDisabled = true

local Player = game.Players:CreateLocalPlayer(0)
Player.CharacterAppearance = ("%s/clothing/%d"):format(baseUrl, assetId)
Player:LoadCharacter(false)

local function removeBodyParts()
    for _, part in pairs(Player.Character:GetChildren()) do
        if part:IsA("BasePart") and part.Name ~= "Head" then
            part:Destroy()
        end
    end
end

removeBodyParts()

game:GetService("RunService"):Run()

Player.Character.Animate.Disabled = true

print(("[%s] Rendering ..."):format(jobId))
local result = game:GetService("ThumbnailGenerator"):Click(format, x, y, true)
print(("[%s] Done!"):format(jobId))

return result