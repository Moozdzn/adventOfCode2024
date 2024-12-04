local leftList = {}

local rightList = {}

local listIndex = 1

for line in io.lines('adventOfCode_1_input.txt') do
    local iterator = line:gmatch("%d+")

    leftList[listIndex] = iterator()
    rightList[listIndex] = iterator()
    listIndex = listIndex + 1
end

-- Part 1

table.sort(leftList, function(a, b)
    return a < b
end)

table.sort(rightList, function(a, b)
    return a < b
end)

local count = 0

for i = 1, #leftList do
    count = count + math.abs(leftList[i] - rightList[i])
end

print(count) -- 1941353

-- Part 2

local similarityScore = 0

for i = 1, #leftList do
    local sameCount = 0

    for j = 1, #rightList do
        if leftList[i] == rightList[j] then
            local startIndex = j
            while leftList[i] == rightList[startIndex] do
                sameCount = sameCount + 1
                startIndex = startIndex + 1
            end
            break
        end
    end

    similarityScore = similarityScore + (leftList[i] * sameCount)
end

print(similarityScore) -- 22539317
