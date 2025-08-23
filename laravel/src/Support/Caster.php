<?php

namespace Atlas\Laravel\Support;

class Caster
{
    /**
     * Cast the given data based on the provided cast definitions.
     *
     * @param array $data  The data to cast.
     * @param array $casts The cast definitions, where keys are field names and values are types.
     * @return array The cast data.
     */
    public static function cast(array $data, array $casts): array
    {
        foreach ($casts as $key => $type) {
            if (array_key_exists($key, $data)) {
                $data[$key] = self::applyCast($data[$key], $type);
            }
        }

        return $data;
    }

    /**
     * Apply the given cast type to the value.
     *
     * @param mixed  $value The value to cast.
     * @param string $type  The cast type.
     * @return mixed The cast value.
     */
    private static function applyCast(mixed $value, string $type): mixed
    {
        return match ($type) {
            'int', 'integer' => (int) $value,
            'float', 'double' => (float) $value,
            'string' => (string) $value,
            'bool', 'boolean' => (bool) $value,
            'array' => (array) $value,
            'datetime' => self::castToDateTime($value),
            'json' => self::castToJson($value),
            default => $value,
        };
    }

    /**
     * Cast a value to DateTime.
     *
     * @param mixed $value The value to cast.
     * @return \DateTime|null The cast DateTime or null on failure.
     */
    private static function castToDateTime(mixed $value): ?\DateTime
    {
        try {
            return new \DateTime($value);
        } catch (\Exception) {
            return null;
        }
    }

    /**
     * Cast a value to a decoded JSON representation.
     *
     * Arrays or objects are converted to JSON and then decoded so that the
     * return value is always a PHP array (or scalar) rather than a JSON string.
     *
     * @param mixed $value The value to cast.
     * @return mixed The decoded JSON value or null on failure.
     */
    private static function castToJson(mixed $value): mixed
    {
        if (is_array($value) || is_object($value)) {
            $value = json_encode($value);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return null;
            }
        }

        $decoded = json_decode($value, true);

        return json_last_error() === JSON_ERROR_NONE ? $decoded : null;
    }
}
